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

import SlidingModal from "../components/common/Modal";
import Image from "../components/common/Image";

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
	max-width: 60%;
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
	const [amount, setAmount] = useState("");

	const startScanning = () => {
		if (qrScannerRef.current) {
			setCurrentScannedQR("");
			return qrScannerRef.current.start();
		}
		qrScannerRef.current = new QrScanner(
			videoElementRef.current,
			(result) => {
				console.log("decoded qr code:", result.data);
				setCurrentScannedQR(result.data);
				qrScannerRef.current.stop();
			},
			{ highlightScanRegion: true, highlightCodeOutline: true }
		);
		qrScannerRef.current.start();
	};

	useEffect(() => {
		startScanning();
	}, []);

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
			<SlidingModal isOpen={currentScannedQR} close={startScanning}>
				<AmountFormContainer>
					<AmountFormImageContainer>
						<Image src="/pay.svg" />
					</AmountFormImageContainer>
					<FormControl fullWidth sx={{ m: 1 }}>
						<InputLabel htmlFor="payment-amount">Amount</InputLabel>
						<OutlinedInput
							id="payment-amount"
							value={amount}
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
							disableElevation
						>
							Proceed To Pay
						</Button>
						<Button color="error" onClick={startScanning} disableElevation>
							Scan Again
						</Button>
					</ActionList>
				</AmountFormContainer>
			</SlidingModal>
			<video ref={videoElementRef} />
		</>
	);
};

export default ScanQR;
