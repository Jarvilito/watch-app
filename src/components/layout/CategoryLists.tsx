import React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './accordion-style.scss';

const CategoryLists = () => {
	const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation(); // Prevent the event from triggering the accordion toggle
		console.log('Button clicked!');
	};

	const handleAccordionChange = (e: any) => {
		console.log('Accordion toggled!');
	};

	return (
		<div className='accordion'>
			<Accordion onChange={handleAccordionChange}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1-content'
					id='panel1-header'
				>
					<div className='accordion-list__main'>
						<Button onClick={handleButtonClick}>Test</Button>
						<h4>Accordion 1</h4>
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<ul className='accordion-list__sub'>
						<li className='accordion-list__sub-item'>
							<Button onClick={handleButtonClick}>Test</Button>
							<h4>Accordion 1</h4>
						</li>

						<li className='accordion-list__sub-item'>
							<Button onClick={handleButtonClick}>Test</Button>
							<h4>Accordion 2</h4>
						</li>
					</ul>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};

export default CategoryLists;
