import React, { useState, useEffect  } from 'react';

import { styled } from 'goober';

interface TourContentProps {
    isBannerStep: boolean;
    tourStep: number;
  }

// Define styled components
const TourOverlay = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TourContent = styled('div')<TourContentProps>`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    max-width: 50%;
    max-height: 80%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 1);

    ${({tourStep }) => (tourStep===1) && `
    position: absolute;
    left:100px;
    width: 400px;
    
   `}
    ${({tourStep }) => (tourStep===2) && `
    position: absolute;
    left:100px;
    width: 400px;
    
    `}
    ${({tourStep }) => (tourStep===3) && `
    position: absolute;
    right:10px;
    width:200px;

    `}
    ${({tourStep }) => (tourStep===4) && `
    position: absolute;
    right:10px;
    width:200px;

    `}
    ${({tourStep }) => (tourStep===5) && `
    position: absolute;
    right:10px;
    width:200px;

    `}
    ${({tourStep }) => (tourStep===6) && `
    position: absolute;
    right:0px;
    width:200px;

    `}
`;

const Banner = styled('banner')`
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 10px;
    float: right;
    colour:orange;

`;
const Arrow = styled('div')`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
`;

const LeftArrow = styled(Arrow)`
  border-width: 10px 0 10px 15px;
  border-color: transparent transparent transparent #fff;
  
  top: 50%;
  transform: translateY(-50%);

`;

const RightArrow = styled(Arrow)`
  border-width: 10px 15px 10px 0;
  border-color: transparent #fff transparent transparent;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 20px;
  border-left: 1px solid #fff; 
`;




interface Step {
  target: string;
  content: string;
}

interface TourProps {
  onClose: () => void;
  Step: (step: number) => void;
}


const LandingPageTour: React.FC<TourProps> = ({ onClose, Step  }) => {
  const [step, setStep] = useState<number>(0);
  const [step1,calledStep1Function]= useState<number>(0);
  let calledBannerStep = false;
  // Define tour steps
  const steps: Step[] = [
    {
      target: '.text', // CSS selector for the element to highlight
      content: 'Welcome! Would you like to have tour of the landing page?',
    },

    {
      target: '.banner', 
      content: 'Automatarium is a tool that allows the user to visualize concepts of Formal languages and Automata Theory, to get started you can select the start building button ',
   
    
    },
    {
      target: '', 
      content: 'If you want more indepth tool guides you can go to the tutorial page using the tutorial button',
   
    
    },
    {
      target: '', 
      content: 'Here we have a testing table',
   
    
    },
    {
      target: '', 
      content: 'You can see a glimpse of how some of the tools of Automatarium work, try the step function, it will reveal how the dfa shown above will run given it\'s input ',
   
    
    },
    {
      target: '', 
      content: 'or you can press the skip button to see the end result  ',
   
    
    },
    {
      target: '', 
      content: 'You can access your recent projects here when you have started building your own automatons',

    },
    
   
    // Add more steps as needed
  ];
  useEffect(() => {
   Step(step)  

  }, [step, Step]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // End the tour if it reaches the last step
      onClose();
    }
  };

  const handleSkip = () => {
    onClose(); // Close the tour
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <TourOverlay>

        <TourContent tourStep={step} isBannerStep={steps[step].target === '.banner'}>  
          <p>{steps[step].content}</p>
          <div className="tour-navigation">
            <button onClick={handlePrevious} disabled={step === 0}>Previous</button>

            <button onClick={handleNext}>{step === steps.length - 1 ? 'Finish' : 'Next'}</button>

            <button onClick={handleSkip} >Skip Tour</button>
          </div>
          
        </TourContent>
     </TourOverlay>
   
  );
};

export default LandingPageTour;

