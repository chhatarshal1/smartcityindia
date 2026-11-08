import { scryptAsync } from '@noble/hashes/scrypt.js';
const encoder=new TextEncoder();
export function randomToken(bytes=32){return Array.from(crypto.getRandomValues(new Uint8Array(bytes)),b=>b.toString(16).padStart(2,'0')).join('')}
export async function digest(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(value))),b=>b.toString(16).padStart(2,'0')).join('')}
export function equal(a:string,b:string){let diff=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)diff|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return diff===0}
export async function hashPassword(password:string,salt=randomToken(16)){
 const hash=await scryptAsync(encoder.encode(password),encoder.encode(salt),{N:32768,r:8,p:3,dkLen:32,maxmem:64*1024*1024});
 return `scrypt$32768$8$3$${salt}$${Array.from(hash,b=>b.toString(16).padStart(2,'0')).join('')}`;
}
export async function verifyPassword(password:string,hash:string){const parts=hash.split('$');if(parts.length!==6||parts.slice(0,4).join('$')!=='scrypt$32768$8$3')return false;return equal(await hashPassword(password,parts[4]),hash)}
export class ApiError extends Error{constructor(public status:number,message:string){super(message)}}
export function text(value:unknown,min:number,max:number,label:string){if(typeof value!=='string'||value.trim().length<min||value.trim().length>max)throw new ApiError(400,`${label} must be ${min}–${max} characters.`);return value.trim()}
export function password(value:unknown){if(typeof value!=='string'||value.length<12||value.length>128||!value.trim())throw new ApiError(400,'Use a password between 12 and 128 characters.');return value}
export function username(value:unknown){const v=text(value,3,24,'Username').toLowerCase();if(!/^[a-z][a-z0-9_]{2,23}$/.test(v))throw new ApiError(400,'Use 3–24 letters, numbers or underscores. Start with a letter.');return v}
export function email(value:unknown){const v=text(value,5,254,'Email').toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))throw new ApiError(400,'Enter a valid email address.');return v}
export function area(value:unknown){if(!Number.isInteger(value)||Number(value)<0||Number(value)>5)throw new ApiError(400,'Choose a valid neighbourhood.');return Number(value)}
export function sameOrigin(request:Request){const origin=request.headers.get('origin');if(origin!==new URL(request.url).origin)throw new ApiError(403,'This request must come from Nearby.');if(request.headers.get('sec-fetch-site')==='cross-site')throw new ApiError(403,'Cross-site requests are not allowed.')}
