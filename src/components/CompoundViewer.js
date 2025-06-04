import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import styled from 'styled-components';

const ViewerContainer = styled.div`
	width: 500px;
	height: 500px;
	background: #2a2a2a;
	border-radius: 8px;
	overflow: hidden;
`;

const LoadingText = styled.div`
	color: white;
	text-align: center;
	padding: 20px;
`;

const CompoundViewer = ({ compoundId }) => {
	// 실제 구현에서는 compoundId를 기반으로 분자 구조 데이터를 가져와야 합니다.
       // 현재는 Sphere를 사용한 간단한 3D 구체로 표시합니다.
	return (
		<ViewerContainer>
			<Suspense fallback={<LoadingText>로딩 중...</LoadingText>}>
				<Canvas camera={{ position: [0, 0, 5] }}>
					<ambientLight intensity={0.5} />
					<pointLight position={[10, 10, 10]} />
					<Sphere args={[1, 32, 32]}>
						<meshStandardMaterial color='#ff6b6b' />
					</Sphere>
					<OrbitControls enableZoom={true} />
				</Canvas>
			</Suspense>
		</ViewerContainer>
	);
};

export default CompoundViewer;
