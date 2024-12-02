import { PaletteOptions, Palette } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Palette {
		primaryBtn: Palette['primary'];
		addBtn: Palette['primary'];
		deleteBtn: Palette['primary'];
	}

	interface PaletteOptions {
		primaryBtn?: PaletteOptions['primary'];
		addBtn?: PaletteOptions['primary'];
		deleteBtn?: PaletteOptions['primary'];
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		primaryBtn: true;
		addBtn: true;
		deleteBtn: true;
	}
}
