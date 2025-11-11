import { LizardText, LizardImage } from '@/components/common/LizardComponents'
import { Items } from '@/types/appData';
import { LizardDiv } from './layout';



export function LizardCard({ title, description, imageSrc, imageAlt, techStack }: Items) {

    return (
        <LizardDiv className='gap-4 rounded-sm border flex-1'>

            <LizardDiv direction="column" className="gap-2">
                {imageSrc && imageAlt &&
                    <LizardImage
                        src={imageSrc}
                        alt={imageAlt}
                        className="rounded-lg w-full h-auto" objectFit='contain' />}
                <LizardText className="text-[25px]">{title}</LizardText>
                <LizardText className="text-[16px] text-gray-400">{description}</LizardText>
            </LizardDiv>

            {techStack && techStack.length > 0 && (
                <LizardDiv direction='row' className="flex flex-wrap gap-2 w-full">
                    {techStack.map((tech, techIdx) => (
                        <LizardDiv
                            key={techIdx}
                            className="px-2 py-1 bg-gray-800 text-white rounded"
                        >
                            <LizardText className="text-xs">{tech}</LizardText>
                        </LizardDiv>
                    ))}
                </LizardDiv>
            )}



        </LizardDiv>




    );
}