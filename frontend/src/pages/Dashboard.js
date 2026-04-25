import {useEffect,useState} from 'react';
import api from '../api';
export default function Dashboard(){
 const [facilities,setFacilities]=useState([]);
 useEffect(()=>{api.get('/facilities').then(r=>setFacilities(r.data));},[]);
 return <div><h2>Sports Facilities</h2>{facilities.map(f=><div key={f.id}><b>{f.name}</b> ({f.sportType})</div>)}</div>}
