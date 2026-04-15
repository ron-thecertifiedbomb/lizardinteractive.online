// components/GearCard.tsx
import React from 'react';
import { GearItem } from '../../../interfaces';


interface Props {
    item: GearItem;
}

const GearCard: React.FC<Props> = ({ item }) => {
    return (
        <div className="border border-zinc-800 p-4 rounded-lg bg-black/50 hover:border-zinc-500 transition-all">
            <span className="text-xs uppercase tracking-widest text-zinc-500">{item.category}</span>
            <h3 className="text-xl font-bold mt-1" style={{ fontFamily: 'Gotham Regular, sans-serif' }}>
                {item.brand} {item.name}
            </h3>
            <p className="text-zinc-400 mt-2 text-sm leading-relaxed">{item.description}</p>

            <a
                href={item.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow"
                className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-medium"
            >
                Check Price & View Details →
            </a>
        </div>
    );
};

export default GearCard;