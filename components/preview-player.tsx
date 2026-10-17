'use client';
import { useRef, useState, useEffect } from 'react';
import { Maximize2, RotateCcw, ExternalLink } from 'lucide-react';
export function PreviewPlayer({source,title}:{source:string;title:string}){
 const frame=useRef<HTMLIFrameElement>(null),container=useRef<HTMLDivElement>(null);
 const [generation,setGeneration]=useState(0),[height,setHeight]=useState(800),[loaded,setLoaded]=useState(false);
 useEffect(()=>{const listener=(event:MessageEvent)=>{if(event.origin!==window.location.origin||event.source!==frame.current?.contentWindow||event.data?.type!=='anatomy:resize')return;const next=event.data.height;if(typeof next==='number'&&Number.isFinite(next))setHeight(Math.min(2400,Math.max(360,Math.ceil(next))));};window.addEventListener('message',listener);return()=>window.removeEventListener('message',listener)},[]);
 function ready(){setLoaded(true);frame.current?.contentWindow?.postMessage({type:'anatomy:measure'},window.location.origin)}
 useEffect(()=>{setLoaded(false);const f=frame.current; if(f?.contentDocument?.readyState==='complete'&&f.contentWindow?.location.pathname===source){setLoaded(true);f.contentWindow.postMessage({type:'anatomy:measure'},window.location.origin)}},[source,generation]);
 async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await container.current?.requestFullscreen()}catch{window.open(source,'_blank','noopener,noreferrer')}}
 return <div className="player-shell" ref={container}><div className="player-toolbar"><span><i className="status-dot"/> INTERACTIVE MODEL</span><div><button onClick={()=>{setLoaded(false);setGeneration(g=>g+1)}} aria-label="Restart model"><RotateCcw size={16}/><span>Restart</span></button><button onClick={fullscreen} aria-label="Enter fullscreen"><Maximize2 size={16}/><span>Expand</span></button><a href={source} target="_blank" rel="noreferrer" aria-label="Open model in a new tab"><ExternalLink size={16}/></a></div></div>{!loaded&&<div className="loading" role="status">Opening your exploration…</div>}<iframe key={generation} ref={frame} src={source} title={title+' — interactive animation'} style={{height}} onLoad={ready} allow="fullscreen" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"/><div className="player-footnote">A simplified teaching model. Shapes and timings are illustrative.</div></div>
}
