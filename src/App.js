import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import ForceGraph2D from 'react-force-graph-2d';
import CompoundViewer from './components/CompoundViewer';

const AppContainer = styled.div`
	width: 100vw;
	height: 100vh;
	background: #1a1a1a;
	color: white;
`;

const GraphContainer = styled.div`
	width: 100%;
	height: 100%;
`;

const Modal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: rgba(0, 0, 0, 0.9);
	padding: 20px;
	border-radius: 10px;
	z-index: 1000;
	display: ${(props) => (props.show ? 'block' : 'none')};
`;

const App = () => {
        const [selectedCompound, setSelectedCompound] = useState(null);
        const [width, setWidth] = useState(window.innerWidth);
       const [height, setHeight] = useState(window.innerHeight);

       useEffect(() => {
               const handleResize = () => {
                       setWidth(window.innerWidth);
                       setHeight(window.innerHeight);
               };
               window.addEventListener('resize', handleResize);
               return () => {
                       window.removeEventListener('resize', handleResize);
               };
       }, []);

       const graphData = useMemo(
               () => ({
                       nodes: [
			{ id: 'cmp1', label: 'Dibutyl Phthalate', type: 'compound' },
			{
				id: 'cmp2',
				label: 'Diethylene Glycol Monoethyl Ether',
				type: 'compound',
			},
			{ id: 'IL1B', label: 'Interleukin-1 beta', type: 'target' },
			{ id: 'APOE', label: 'Apolipoprotein E', type: 'target' },
			{ id: 'ALB', label: 'Albumin', type: 'target' },
			{ id: 'APOA1', label: 'Apolipoprotein A-I', type: 'target' },
			{ id: 'CLU', label: 'Clusterin', type: 'target' },
			{ id: 'C3', label: 'Complement C3', type: 'target' },
			{ id: 'TTR', label: 'Transthyretin', type: 'target' },
			{ id: 'APOH', label: 'Beta-2-glycoprotein 1', type: 'target' },
			{ id: 'A2M', label: 'Alpha-2-macroglobulin', type: 'target' },
		],
		links: [
			{ source: 'cmp1', target: 'IL1B' },
			{ source: 'cmp1', target: 'APOE' },
			{ source: 'cmp2', target: 'ALB' },
			{ source: 'cmp2', target: 'APOA1' },
			{ source: 'cmp2', target: 'CLU' },
			{ source: 'cmp2', target: 'C3' },
			{ source: 'cmp2', target: 'TTR' },
			{ source: 'cmp2', target: 'APOH' },
			{ source: 'cmp2', target: 'APOE' },
			{ source: 'cmp2', target: 'A2M' },
               ],
       }),
       []
       );

	const handleNodeClick = (node) => {
		if (node.type === 'compound') {
			setSelectedCompound(node);
		}
	};

	return (
		<AppContainer>
			<GraphContainer>
                                <ForceGraph2D
                                        width={width}
                                        height={height}
                                        graphData={graphData}
                                        nodeLabel='label'
                                        nodeColor={(node) =>
                                                node.type === 'compound' ? '#ff6b6b' : '#4ecdc4'
                                        }
					nodeRelSize={6}
					linkColor={() => '#ffffff'}
					onNodeClick={handleNodeClick}
				/>
			</GraphContainer>
			<Modal show={selectedCompound !== null}>
				{selectedCompound && (
					<>
						<h2>{selectedCompound.label}</h2>
						<CompoundViewer compoundId={selectedCompound.id} />
						<button onClick={() => setSelectedCompound(null)}>닫기</button>
					</>
				)}
			</Modal>
		</AppContainer>
	);
};

export default App;
