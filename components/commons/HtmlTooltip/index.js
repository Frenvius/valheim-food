import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} placement="top" arrow />
))(() => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundImage: 'url("/img/card-bg.png")',
		backgroundSize: 'cover',
		backgroundColor: '#707070',
		maxWidth: 220
	}
}));

export default HtmlTooltip;