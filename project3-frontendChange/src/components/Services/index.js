import React from 'react'
import Icon1 from '../../images/svg-3.svg'
import Icon2 from '../../images/svg-2.svg'
import Icon3 from '../../images/svg-6.svg'
import {ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP} from './ServicesElements'

const Services = () => {
    return (
        <>
         <ServicesContainer id="services">
             <ServicesH1>Our Services</ServicesH1>
             <ServicesWrapper>
                 <ServicesCard>
                     <ServicesIcon src={Icon1}/>
                     <ServicesH2>Calculate Taxes</ServicesH2>
                     <ServicesP>Calculate your income and property tax and find out your disposable income.</ServicesP>
                 </ServicesCard>
                 <ServicesCard>
                     <ServicesIcon src={Icon2}/>
                     <ServicesH2>Budgeting</ServicesH2>
                     <ServicesP>Budget out your lifestyle, and see recommended percentages of different filters.</ServicesP>
                 </ServicesCard>
                 <ServicesCard>
                     <ServicesIcon src={Icon3}/>
                     <ServicesH2>Savings</ServicesH2>
                     <ServicesP>See how much of your income you save per year or month by month.</ServicesP>
                 </ServicesCard>
             </ServicesWrapper>
         </ServicesContainer>  
        </>
    )
}

export default Services
