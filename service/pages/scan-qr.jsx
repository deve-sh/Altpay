import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import QrScanner from "qr-scanner";
import {
	Button,
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";

import getUPIIdFromQRLink from "../utils/getUPIIdFromQRLink";
import SlidingModal from "../components/common/Modal";
import Image from "../components/common/Image";
import CameraOptions from "../components/QRScanner/CameraOptions";

const Base = styled.div`
	background: var(--primary);
	height: 100vh;
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

const ScanVideoElement = styled.video`
	max-height: 100vh;
	width: 100vw;
	z-index: 1000;
`;

const AmountFormContainer = styled.form`
	padding: 1.5rem;
	text-align: center;
	display: flex;
	flex-flow: column;
	gap: 1rem;
	align-items: center;
`;

const AmountFormImageContainer = styled.div`
	height: 35vh;
	margin-bottom: 1.25rem;
`;

const ActionList = styled.div`
	width: 100%;
	display: flex;
	gap: 1.25rem;
	justify-content: center;
`;

const ScanQR = () => {
	const router = useRouter();
	const videoElementRef = useRef();
	const qrScannerRef = useRef();

	const [currentScannedQR, setCurrentScannedQR] = useState("");
	const [scannedUPIId, setScannedUPIId] = useState("");
	const [amount, setAmount] = useState("");

	const [camerasAvailable, setCamerasAvailable] = useState([]);
	const [selectedCamera, setSelectedCamera] = useState("");

	const [hasFlash, setHasFlash] = useState(false);
	const [isFlashOn, setIsFlashOn] = useState(false);

	const toggleFlash = () => {
		if (qrScannerRef.current) {
			qrScannerRef.current.toggleFlash().then(() => {
				qrScannerRef.current.isFlashOn().then(setIsFlashOn);
			});
		}
	};

	const getCameraList = () => {
		QrScanner.listCameras(true).then((cameraList) => {
			setCamerasAvailable(cameraList);
			setSelectedCamera(cameraList[0]?.id || 0);
		});
	};
	const getFlashAvailable = () => {
		if (qrScannerRef.current) qrScannerRef.current.hasFlash().then(setHasFlash);
	};

	const changeCamera = (cameraId) => {
		if (qrScannerRef.current) {
			qrScannerRef.current.setCamera(cameraId).then(() => {
				getFlashAvailable();
				setSelectedCamera(cameraId);
			});
		}
	};

	const startScanning = () => {
		if (qrScannerRef.current) {
			setCurrentScannedQR("");
			setScannedUPIId("");
			return qrScannerRef.current.start();
		}
		qrScannerRef.current = new QrScanner(
			videoElementRef.current,
			(result) => {
				if (result.data.startsWith("upi://")) {
					setCurrentScannedQR(result.data);
					setScannedUPIId(getUPIIdFromQRLink(result.data));
					qrScannerRef.current.stop();
				}
				// Keep scanning otherwise.
			},
			{ highlightScanRegion: true, highlightCodeOutline: true }
		);
		qrScannerRef.current.start();
	};

	useEffect(() => {
		getCameraList();
		startScanning();
	}, []);

	useEffect(() => {
		if (camerasAvailable.length) {
			getFlashAvailable();
		}
	}, [camerasAvailable]);

	const proceedToPayment = () => {
		if (amount)
			router.push(
				`/make-payment?upi_qr_id=${currentScannedQR}&amount=${amount}`
			);
	};

	return (
		<>
			<Head>
				<title>Alt | Scan QR</title>
			</Head>
			<Base />
			<SlidingModal isOpen={currentScannedQR} close={startScanning}>
				<AmountFormContainer>
					<AmountFormImageContainer>
						<Image src="/pay.svg" />
					</AmountFormImageContainer>
					ID: {scannedUPIId}
					<FormControl fullWidth>
						<InputLabel htmlFor="payment-amount">Amount</InputLabel>
						<OutlinedInput
							id="payment-amount"
							value={amount}
							type="number"
							step="0.01"
							required
							min="1"
							onChange={(e) => setAmount(e.target.value)}
							startAdornment={
								<InputAdornment position="start">₹</InputAdornment>
							}
							label="Amount"
						/>
					</FormControl>
					<ActionList>
						<Button
							variant="contained"
							color="primary"
							onClick={proceedToPayment}
							disabled={!Number(amount)}
						>
							Proceed To Pay
						</Button>
						<Button color="error" onClick={startScanning}>
							Scan Again
						</Button>
					</ActionList>
				</AmountFormContainer>
			</SlidingModal>
			<CameraOptions
				camerasAvailable={camerasAvailable}
				selectedCamera={selectedCamera}
				onCameraChange={changeCamera}
				hasFlash={hasFlash}
				isFlashOn={isFlashOn}
				toggleFlash={toggleFlash}
			/>
			<ScanVideoElement ref={videoElementRef} />
		</>
	);
};

export default ScanQR;
