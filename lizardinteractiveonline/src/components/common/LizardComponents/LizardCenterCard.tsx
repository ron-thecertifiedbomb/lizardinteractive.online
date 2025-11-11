
// import { LizardText } from "@/components/common/LizardComponents/LizardText";
// import { LizardImage } from "@/components/common/LizardComponents/LizardImage";

// interface LizardCenterCardProps {
//   className?: string;
// }

// export function LizardCenterCard({ className = "" }: LizardCenterCardProps) {


//   return (
//     <div className={`flex flex-col gap-4 ${className}`}>
//       {services.map((service: any) => {
//         const isSelected = selectedSkillType === service.type;

//         return (
//           <div
//             key={service.type}
//             onClick={() => setSelectedSkillType(service.type)}
//             className={`
//               w-full flex flex-row items-center
//               rounded-sm border-[0.5px] border-[rgba(255,255,255,0.1)]
//               shadow-md backdrop-blur-sm bg-white/5
//               transition-shadow duration-300 ease-in-out
//               hover:shadow-lg hover:bg-white/10
//               cursor-pointer
//               ${isSelected ? "bg-[#E84A4A]/20 border-[#E84A4A] shadow-lg" : ""}
//             `}
//           >
//             {/* Image */}
//             <div className="flex-shrink-0 flex justify-center items-center p-6 border-r border-[rgba(255,255,255,0.1)]">
//               <LizardImage
//                 src={service.imageSrc}
//                 alt={service.imageAlt || "logo"}
//                 objectFit="contain"
//                 className="w-10 h-auto"
//               />
//             </div>

//             {/* Content */}
//             <div className="flex flex-col p-8">
//               <LizardText
//                 variant="h4"
//                 className={`font-iceland text-[25px] mb-2 font-medium uppercase ${isSelected ? "text-[#E84A4A]" : "text-[#b3b3b3]"
//                   }`}
//               >
//                 {service.title}
//               </LizardText>

//               {service.description && (
//                 <LizardText
//                   variant="p"
//                   className="text-[14px] text-[#b3b3b3]  tracking-wide uppercase"
//                 >
//                   {service.description}
//                 </LizardText>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
