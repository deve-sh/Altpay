import styled from "@emotion/styled";

const Img = styled.img`
	max-width: 100%;
	max-height: 100%;
`;

const Image = ({ alt, title, src, loading, ...props }) => (
	<Img alt={alt} title={title || alt} src={src} loading={loading} {...props} />
);

export default Image;
