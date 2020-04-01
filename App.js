import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

class Iframe extends Component {
	render() {
		return <WebView source={{ uri: 'https://health-infobase.canada.ca/covid-19/iframe/map.html' }} />;
		}
}

export default function App() {
	
	return (
		<Iframe />
	);
}
