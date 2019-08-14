import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import infoAddon from '@storybook/addon-info';
import 'babel-polyfill';

setOptions({
	name: 'xanda',
	url: 'http://www.xanda.net/',
	goFullScreen: false,
	downPanelInRight: true,
	showDownPanel: true,
});

function loadStories() {
  require('../docs');
}

setAddon(infoAddon);

configure(loadStories, module);
