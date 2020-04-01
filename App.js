import * as React from "react"
import { WebView as RNWebView } from "react-native-webview"
import { RefreshControl, ViewStyle, ScrollView } from "react-native"

// prettier-ignore
const INJECTED_JS = `
window.onscroll = function() {
	window.ReactNativeWebView.postMessage(
		JSON.stringify({
			scrollTop: document.documentElement.scrollTop || document.body.scrollTop
		}),     
	)
}
`

const SCROLLVIEW_CONTAINER: ViewStyle = {
	flex: 1,
	height: "100%",
	marginTop: 40,
}

const WEBVIEW = (height): ViewStyle => ({
	marginLeft : 40,
	height,
})

export class Iframe extends React.Component<ExampleProps, ExampleState> {
	webView: any
	
	state = {
		isPullToRefreshEnabled: true,
		scrollViewHeight: 0,
	}
	
	setWebViewRef = ref => {
		this.webView = ref
	}
	
	onRefresh = () => this.webView.reload()
	
	onWebViewMessage = e => {
		const { data } = e.nativeEvent
		
		try {
			const { scrollTop } = JSON.parse(data)
			this.setState({ isPullToRefreshEnabled: scrollTop === 0 })
		} catch (error) {}
	}
	
	render() {
		const { scrollViewHeight, isPullToRefreshEnabled } = this.state
		
		return (
			<ScrollView
			style={SCROLLVIEW_CONTAINER}
			onLayout={e => this.setState({ scrollViewHeight: e.nativeEvent.layout.height })}
			refreshControl={
				<RefreshControl
				refreshing={false}
				enabled={isPullToRefreshEnabled}
				onRefresh={this.onRefresh}
				tintColor="transparent"
				colors={["transparent"]}
				style={{ backgroundColor: "transparent" }}
				/>
			}>
			<RNWebView
				source={{ uri: 'https://health-infobase.canada.ca/covid-19/iframe/map.html' }}
				ref={this.setWebViewRef}
				style={WEBVIEW(scrollViewHeight)}
				onMessage={this.onWebViewMessage}
				injectedJavaScript={INJECTED_JS}
			/>
			</ScrollView>
		)
	}
}

export default function App() {
	
	return (
		<Iframe />
	);
}

