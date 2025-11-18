"use client";

import React, { useRef, useState } from "react";
import Button from "../shared/Button/Button";

type BaseElement = {
    id: string;
    x: number;
    y: number;
    draggable: boolean;
};

type TextElement = BaseElement & {
    type: "text";
    text: string;
    fontSize: number;
    fill: string;
    fontFamily: string;
};

type RectElement = BaseElement & {
    type: "rect";
    width: number;
    height: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
};

type CircleElement = BaseElement & {
    type: "circle";
    radius: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
};

type ImageElement = BaseElement & {
    type: "image";
    width: number;
    height: number;
    src: string | ArrayBuffer | null;
};

type LogoElement = TextElement | RectElement | CircleElement | ImageElement;

export default function LogoMaker() {
    const [elements, setElements] = useState<LogoElement[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [canvasSize] = useState({ width: 600, height: 400 });

    const svgRef = useRef<SVGSVGElement | null>(null);
    const dragState = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

    const selected = elements.find((el) => el.id === selectedId) || null;

    function addText() {
        const id = crypto.randomUUID();
        setElements((prev) => [
            ...prev,
            {
                id,
                type: "text",
                x: 150,
                y: 150,
                text: "New Text",
                fontSize: 36,
                fill: "#111827",
                fontFamily: "Inter, sans-serif",
                draggable: true,
            },
        ]);
        setSelectedId(id);
    }

    function addShape(type: "rect" | "circle") {
        const id = crypto.randomUUID();
        const shape =
            type === "rect"
                ? {
                    id,
                    type,
                    x: 200,
                    y: 150,
                    width: 120,
                    height: 80,
                    fill: "#6366f1",
                    stroke: "#4338ca",
                    strokeWidth: 3,
                    draggable: true,
                }
                : {
                    id,
                    type,
                    x: 200,
                    y: 150,
                    radius: 60,
                    fill: "#6366f1",
                    stroke: "#4338ca",
                    strokeWidth: 3,
                    draggable: true,
                };
        setElements((prev) => [...prev, shape as LogoElement]);
        setSelectedId(id);
    }

    function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const id = crypto.randomUUID();
            setElements((prev) => [
                ...prev,
                {
                    id,
                    type: "image",
                    x: 100,
                    y: 100,
                    width: 200,
                    height: 120,
                    src: reader.result,
                    draggable: true,
                },
            ]);
            setSelectedId(id);
        };
        reader.readAsDataURL(file);
    }

    function reorder(id: string, dir: "up" | "down") {
        setElements((prev) => {
            const index = prev.findIndex((el) => el.id === id);
            if (index === -1) return prev;

            const newArr = [...prev];
            const swapIndex = dir === "up" ? index + 1 : index - 1;

            if (swapIndex < 0 || swapIndex >= newArr.length) return prev;

            [newArr[index], newArr[swapIndex]] = [newArr[swapIndex], newArr[index]];
            return newArr;
        });
    }

    function removeLayer(id: string) {
        setElements((prev) => prev.filter((el) => el.id !== id));
        if (selectedId === id) setSelectedId(null);
    }

    function onMouseDown(e: React.MouseEvent, el: LogoElement) {
        e.stopPropagation();
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect) return;
        dragState.current = {
            id: el.id,
            offsetX: e.clientX - rect.left - el.x,
            offsetY: e.clientY - rect.top - el.y,
        };
        setSelectedId(el.id);
    }

    function onMouseMove(e: React.MouseEvent) {
        if (!dragState.current) return;
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect) return;

        const { id, offsetX, offsetY } = dragState.current;
        const x = e.clientX - rect.left - offsetX;
        const y = e.clientY - rect.top - offsetY;

        setElements((prev) => prev.map((el) => (el.id === id ? { ...el, x, y } : el)));
    }

    function onMouseUp() {
        dragState.current = null;
    }

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 ">
            {/* Canvas */}
            <div className="md:col-span-3">
                <div className="flex gap-2 mb-2">
                    <Button onClick={addText}>Add Text</Button>
                    <Button onClick={() => addShape("rect")}>Rect</Button>
                    <Button onClick={() => addShape("circle")}>Circle</Button>
                    <label className="bg-blue-950 p-4 rounded-sm cursor-pointer">
                        Upload
                        <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
                    </label>
                </div>

                <svg
                    ref={svgRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    className=" bg-gray-100 "
                >
                    {elements.map((el) => {
                        if (el.type === "text")
                            return (
                                <text
                                    key={el.id}
                                    x={el.x}
                                    y={el.y}
                                    fontSize={el.fontSize}
                                    fill={el.fill}
                                    onMouseDown={(e) => onMouseDown(e, el)}
                                    style={{ cursor: "grab", userSelect: "none" }}
                                >
                                    {el.text}
                                </text>
                            );
                        if (el.type === "rect")
                            return (
                                <rect
                                    key={el.id}
                                    x={el.x}
                                    y={el.y}
                                    width={el.width}
                                    height={el.height}
                                    fill={el.fill}
                                    stroke={el.stroke}
                                    strokeWidth={el.strokeWidth}
                                    onMouseDown={(e) => onMouseDown(e, el)}
                                    style={{ cursor: "grab" }}
                                />
                            );
                        if (el.type === "circle")
                            return (
                                <circle
                                    key={el.id}
                                    cx={el.x}
                                    cy={el.y}
                                    r={el.radius}
                                    fill={el.fill}
                                    stroke={el.stroke}
                                    strokeWidth={el.strokeWidth}
                                    onMouseDown={(e) => onMouseDown(e, el)}
                                    style={{ cursor: "grab" }}
                                />
                            );
                        if (el.type === "image")
                            return (
                                <image
                                    key={el.id}
                                    x={el.x}
                                    y={el.y}
                                    width={el.width}
                                    height={el.height}
                                    href={el.src as string}
                                    onMouseDown={(e) => onMouseDown(e, el)}
                                    style={{ cursor: "grab" }}
                                />
                            );
                        return null;
                    })}
                </svg>
            </div>

            {/* Layers */}
            <aside className=" bg-gray-100  p-4 rounded shadow w-full ">
                <h2 className="font-semibold mb-3 text-slate-700">Layers</h2>
                <div className="space-y-2">
                    {elements.map((el) => (
                        <div
                            key={el.id}
                            className={`p-2 gap-2 bg-slate-600 rounded cursor-pointer flex flex-col items-center justify-between ${el.id === selectedId ? "bg-blue-100" : ""
                                }`}
                            onClick={() => setSelectedId(el.id)}
                        >
                            <span>{el.type.toUpperCase()}</span>
                            <div className="flex gap-1">
                                <Button onClick={() => reorder(el.id, "up")}>↑</Button>
                                <Button onClick={() => reorder(el.id, "down")}>↓</Button>
                                <Button onClick={() => removeLayer(el.id)}>✕</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Inspector */}
            {selected && (
                <aside className="fixed right-4 top-4 w-72 bg-blue-600 border shadow-xl rounded-lg p-4 space-y-4 z-50">
                    <h3 className="font-semibold text-lg mb-2">Inspector</h3>

                    {/* Position */}
                    <div className="space-y-1">
                        <label className="font-medium text-sm">Position</label>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="number"
                                className="input w-full text-gray-700"
                                value={selected.x}
                                onChange={(e) =>
                                    setElements((prev) =>
                                        prev.map((el) =>
                                            el.id === selectedId ? { ...el, x: Number(e.target.value) } : el
                                        )
                                    )
                                }
                            />
                            <input
                                type="number"
                                className="input w-full text-gray-700"
                                value={selected.y}
                                onChange={(e) =>
                                    setElements((prev) =>
                                        prev.map((el) =>
                                            el.id === selectedId ? { ...el, y: Number(e.target.value) } : el
                                        )
                                    )
                                }
                            />
                        </div>
                    </div>

                    {/* Text controls */}
                    {selected.type === "text" && (
                        <>
                            <div className="space-y-1">
                                <label className="font-medium text-sm">Text</label>
                                <input
                                    type="text"
                                    className="input w-full text-gray-700"
                                    value={selected.text}
                                    onChange={(e) =>
                                        setElements((prev) =>
                                            prev.map((el) => (el.id === selectedId ? { ...el, text: e.target.value } : el))
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="font-medium text-sm">Font Size</label>
                                <input
                                    type="number"
                                    className="input w-full text-gray-700"
                                    value={selected.fontSize}
                                    onChange={(e) =>
                                        setElements((prev) =>
                                            prev.map((el) =>
                                                el.id === selectedId ? { ...el, fontSize: Number(e.target.value) } : el
                                            )
                                        )
                                    }
                                />
                            </div>
                        </>
                    )}

                    {/* Shape controls */}
                    {(selected.type === "rect" || selected.type === "circle") && (
                        <>
                            {/* Size */}
                            {selected.type === "rect" && (
                                <>
                                    <div className="space-y-1">
                                        <label className="font-medium text-sm">Width</label>
                                        <input
                                            type="number"
                                            className="input w-full text-gray-700"
                                            value={selected.width}
                                            onChange={(e) =>
                                                setElements((prev) =>
                                                    prev.map((el) =>
                                                        el.id === selectedId ? { ...el, width: Number(e.target.value) } : el
                                                    )
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="font-medium text-sm">Height</label>
                                        <input
                                            type="number"
                                            className="input w-full text-gray-700"
                                            value={selected.height}
                                            onChange={(e) =>
                                                setElements((prev) =>
                                                    prev.map((el) =>
                                                        el.id === selectedId ? { ...el, height: Number(e.target.value) } : el
                                                    )
                                                )
                                            }
                                        />
                                    </div>
                                </>
                            )}
                            {selected.type === "circle" && (
                                <div className="space-y-1">
                                    <label className="font-medium text-sm">Radius</label>
                                    <input
                                        type="number"
                                        className="input w-full text-gray-700"
                                        value={selected.radius}
                                        onChange={(e) =>
                                            setElements((prev) =>
                                                prev.map((el) =>
                                                    el.id === selectedId ? { ...el, radius: Number(e.target.value) } : el
                                                )
                                            )
                                        }
                                    />
                                </div>
                            )}

                            {/* Fill color */}
                            <div className="space-y-1">
                                <label className="font-medium text-sm">Fill Color</label>
                                <input
                                    type="color"
                                    className="input h-10 w-full"
                                    value={selected.fill}
                                    onChange={(e) =>
                                        setElements((prev) =>
                                            prev.map((el) => (el.id === selectedId ? { ...el, fill: e.target.value } : el))
                                        )
                                    }
                                />
                            </div>

                            {/* Stroke color */}
                            <div className="space-y-1">
                                <label className="font-medium text-sm">Border Color</label>
                                <input
                                    type="color"
                                    className="input h-10 w-full"
                                    value={selected.stroke}
                                    onChange={(e) =>
                                        setElements((prev) =>
                                            prev.map((el) => (el.id === selectedId ? { ...el, stroke: e.target.value } : el))
                                        )
                                    }
                                />
                            </div>

                            {/* Toggle border */}
                            <div className="space-y-1">
                                <label className="font-medium text-sm flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selected.strokeWidth > 0}
                                        onChange={(e) =>
                                            setElements((prev) =>
                                                prev.map((el) =>
                                                    el.id === selectedId
                                                        ? { ...el, strokeWidth: e.target.checked ? 3 : 0 }
                                                        : el
                                                )
                                            )
                                        }
                                    />
                                    Show Border
                                </label>
                            </div>

                            {/* Border Width */}
                            {selected.strokeWidth > 0 && (
                                <div className="space-y-1">
                                    <label className="font-medium text-sm">Border Width</label>
                                    <input
                                        type="number"
                                        className="input w-full text-gray-700"
                                        value={selected.strokeWidth}
                                        min={0}
                                        onChange={(e) =>
                                            setElements((prev) =>
                                                prev.map((el) =>
                                                    el.id === selectedId
                                                        ? { ...el, strokeWidth: Number(e.target.value) }
                                                        : el
                                                )
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </>
                    )}


                    {/* Color */}
                    {"fill" in selected && (
                        <div className="space-y-1">
                            <label className="font-medium text-sm">Color</label>
                            <input
                                type="color"
                                className="input h-10 w-full"
                                value={selected.fill}
                                onChange={(e) =>
                                    setElements((prev) =>
                                        prev.map((el) => (el.id === selectedId ? { ...el, fill: e.target.value } : el))
                                    )
                                }
                            />
                        </div>
                    )}

                    {/* Delete */}
                    <Button className="w-full bg-red-500 text-white p-2 rounded" onClick={() => removeLayer(selectedId)}>
                        Delete Element
                    </Button>
                </aside>
            )}
        </div>
    );
}
