import styled from "@emotion/styled";

import VideocamIcon from "@mui/icons-material/Videocam";
import FlashlightOnIcon from "@mui/icons-material/FlashlightOn";
import FlashlightOffIcon from "@mui/icons-material/FlashlightOff";

import {
	OutlinedInput,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	IconButton,
} from "@mui/material";

const CameraOptionsContainer = styled.div`
	position: ${(props) => (props.$logsEnabled ? "absolute" : "fixed")};
	bottom: 0;
	right: 0;
	left: 0;
	padding: 1rem;
	text-align: center;
	background: var(--white);
	z-index: 1001;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 3rem;
`;

const CameraListContainer = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
`;

const CameraOptions = ({
	logsEnabled,
	camerasAvailable,
	onCameraChange,
	selectedCamera,
	hasFlash,
	isFlashOn,
	toggleFlash,
}) => {
	return (
		<CameraOptionsContainer $logsEnabled={logsEnabled}>
			<CameraListContainer>
				<VideocamIcon fontSize="large" />
				<FormControl>
					<InputLabel id="camera-select">Camera</InputLabel>
					<Select
						labelId="camera-select"
						id="camera-select-input"
						value={selectedCamera}
						onChange={onCameraChange}
						input={
							<OutlinedInput style={{ minWidth: "250px" }} label="Camera" />
						}
					>
						{camerasAvailable.map((camera, index) => (
							<MenuItem key={camera.id || index} value={camera.id || index}>
								{camera.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</CameraListContainer>
			{hasFlash && (
				<div>
					<IconButton size="large" onClick={toggleFlash}>
						{isFlashOn ? (
							<FlashlightOffIcon fontSize="large" />
						) : (
							<FlashlightOnIcon fontSize="large" />
						)}
					</IconButton>
				</div>
			)}
		</CameraOptionsContainer>
	);
};

export default CameraOptions;
