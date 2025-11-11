import { LizardTailwindColors, LizardText } from "@/components/common/LizardComponents";
import { LizardDiv } from "@/components/common/LizardComponents/layout";

export function PlayGround() {
  return (
    <>

      <LizardDiv className="flex flex-col items-center w-full justify-center min-h-screen bg-transparent pt-20">
        <LizardText className="text-4xl font-bold text-center mb-6 uppercase">
          Tailwind Colors
        </LizardText>
        <LizardDiv className="w-full max-w-7xl">
          <LizardTailwindColors />
        </LizardDiv>
      </LizardDiv>
    </>
  );
}
