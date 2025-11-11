import { useState, useEffect } from "react";
import { LizardDiv } from "../layout";
import { LizardText } from "../LizardText";

type Currency = { code: string; name: string };

interface LizardCurrencyConverterProps {
    className?: string;
}

export function LizardCurrencyConverter({ className = "" }: LizardCurrencyConverterProps) {
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<string>("");
    const [toCurrency, setToCurrency] = useState<string>("");
    const [converted, setConverted] = useState<number | null>(null);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [loadingList, setLoadingList] = useState(false);
    const [loadingConvert, setLoadingConvert] = useState(false);
    const [error, setError] = useState("");

    // Load currency list with fallback
    useEffect(() => {
        let active = true;
        const load = async () => {
            setLoadingList(true);
            setError("");
            try {
                // 1) Try exchangerate.host
                const r1 = await fetch("https://api.exchangerate.host/symbols");
                if (!r1.ok) throw new Error("symbols failed");
                const d1 = await r1.json();
                if (d1?.symbols) {
                    const list: Currency[] = Object.values(d1.symbols).map((s: any) => ({
                        code: s.code,
                        name: s.description || s.code,
                    }));
                    list.sort((a, b) => a.code.localeCompare(b.code));
                    if (!active) return;
                    setCurrencies(list);

                    const codes = list.map((c) => c.code);
                    const preferFrom = codes.includes("PHP") ? "PHP" : list[0]?.code ?? "";
                    const preferTo = codes.includes("MYR") ? "MYR" : list[1]?.code ?? list[0]?.code ?? "";
                    setFromCurrency((prev) => prev || preferFrom);
                    setToCurrency((prev) =>
                        prev || (preferFrom === preferTo && list[1] ? list[1].code : preferTo)
                    );
                    return;
                }
                throw new Error("symbols missing");
            } catch {
                // 2) Fallback: frankfurter.app
                try {
                    const r2 = await fetch("https://api.frankfurter.app/currencies");
                    if (!r2.ok) throw new Error("fallback failed");
                    const d2 = await r2.json();
                    const list: Currency[] = Object.entries(d2).map(([code, name]) => ({
                        code,
                        name: String(name),
                    }));
                    list.sort((a, b) => a.code.localeCompare(b.code));
                    if (!active) return;
                    setCurrencies(list);

                    const codes = list.map((c) => c.code);
                    const preferFrom = codes.includes("PHP") ? "PHP" : list[0]?.code ?? "";
                    const preferTo = codes.includes("MYR") ? "MYR" : list[1]?.code ?? list[0]?.code ?? "";
                    setFromCurrency((prev) => prev || preferFrom);
                    setToCurrency((prev) =>
                        prev || (preferFrom === preferTo && list[1] ? list[1].code : preferTo)
                    );
                } catch {
                    if (!active) return;
                    setError("Failed to load currency list");
                }
            } finally {
                if (active) setLoadingList(false);
            }
        };
        load();
        return () => {
            active = false;
        };
    }, []);

    const swap = () => {
        setConverted(null);
        setFromCurrency((f) => {
            const t = toCurrency;
            setToCurrency(f);
            return t;
        });
    };

    const convertCurrency = async () => {
        if (!amount || !fromCurrency || !toCurrency) {
            setError("Please select both currencies and enter an amount.");
            return;
        }
        setLoadingConvert(true);
        setError("");
        setConverted(null);
        try {
            // Primary: exchangerate.host
            const res = await fetch(
                `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
            );
            const data = await res.json();
            if (typeof data?.result === "number") {
                setConverted(data.result);
            } else {
                // Fallback: frankfurter.app
                const r2 = await fetch(
                    `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
                );
                const d2 = await r2.json();
                const val = d2?.rates?.[toCurrency];
                if (typeof val === "number") setConverted(val);
                else throw new Error("Conversion failed");
            }
        } catch (err) {
            console.error(err);
            setError("Conversion failed");
        } finally {
            setLoadingConvert(false);
        }
    };

    return (
        <LizardDiv className={`p-4 border rounded shadow-md bg-white/10 ${className} justify-center`}>
            <LizardText className="text-center font-bold text-lg mb-4 uppercase  text-green-500">
                Lizard Interactive Currency Converter
            </LizardText>
            <LizardDiv className="flex gap-2 mb-2">
                <input
                    type="number"
                    className="border p-2 rounded flex-1"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    placeholder="Amount"
                />

                <select
                    className="border p-2 rounded flex-1 text-green-500"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    disabled={loadingList || currencies.length === 0}
                >
                    {loadingList && <option>Loading currencies…</option>}
                    {!loadingList &&
                        currencies.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.code} — {c.name}
                            </option>
                        ))}
                </select>

                <button
                    type="button"
                    onClick={swap}
                    className="px-3 rounded border hover:bg-white/5"
                    disabled={loadingList || currencies.length === 0}
                    title="Swap currencies"
                >
                    ↔
                </button>

                <select
                    className="border p-2 rounded flex-1 text-green-500"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    disabled={loadingList || currencies.length === 0}
                >
                    {loadingList && <option>Loading currencies…</option>}
                    {!loadingList &&
                        currencies.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.code} — {c.name}
                            </option>
                        ))}
                </select>
            </LizardDiv>

            <button
                onClick={convertCurrency}
                className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-2 disabled:opacity-60"
                disabled={loadingConvert || loadingList || !fromCurrency || !toCurrency}
            >
                {loadingConvert ? "Converting…" : "Convert"}
            </button>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {converted !== null && (
                <LizardText className="text-center font-bold text-green-500">
                    {amount} {fromCurrency} = {converted.toFixed(2)} {toCurrency}
                </LizardText>
            )}
        </LizardDiv>
    );
}
