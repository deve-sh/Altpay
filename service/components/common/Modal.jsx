import { useRef, useEffect } from "react";
import styled from "@emotion/styled";

const SlidingModalContainer = styled.div`
	position: fixed;
	top: 100%;
	right: 0;
	bottom: 0;
	z-index: 1000;
	left: 0;
	background: rgba(0, 0, 0, 0.35);
	transition: 0.3s;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;

	&.active {
		top: 0;
	}
`;

const Modal = styled.div`
	background: var(--white);
	padding: 1rem;
	border-radius: 0.5rem;
	min-width: 50vw;
	position: relative;
`;

const SlidingModal = ({ isOpen, close, children }) => {
	const modalRef = useRef(null);
	const containerRef = useRef(null);

	useEffect(() => {
		if (modalRef.current) {
			const listenToClicksOutsideOfModal = (event) => {
				if (modalRef.current.contains(event.target)) return;
				close();
			};
			containerRef.current.addEventListener(
				"click",
				listenToClicksOutsideOfModal
			);
			return () =>
				containerRef.current
					? containerRef.current.removeEventListener(
							"click",
							listenToClicksOutsideOfModal
					  )
					: null;
		}
	}, []);

	return (
		<SlidingModalContainer
			ref={containerRef}
			className={isOpen ? "active" : ""}
		>
			<Modal open={isOpen} onClose={close} ref={modalRef}>
				{children}
			</Modal>
		</SlidingModalContainer>
	);
};

export default SlidingModal;
