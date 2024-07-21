import React, { useEffect, useState } from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getClientCount, getCommandeCount, getCampagneCount, getVenteCount, getProduitCount, getServiceCount } from '../../services/servise'
import './/Home.css'; // Ensure to import your CSS file



function Home() {
  const [campagne, setCampagne] = useState(0);
  const [vente, setVente] =  useState(0);
  const [produit, setProduit] =  useState(0);
  const [service, setService] =  useState(0);
  const [commande, setCommande] =  useState(0);
  const [client, setClient] =  useState(0);
  useEffect(() => {
    let mount = true
    getClientCount().then(res => {
      if (mount) {
        console.log("Count from API:", res);
        setClient(res)
      }
    });
    return () => {
        mount = false;
    };
  }, []); 

useEffect(() => {
  let mount = true;
  getCampagneCount().then(count => {
      if (mount) {
          console.log("Count from API:", count);
          setCampagne(count);
      }
  });
  return () => {
      mount = false;
  };
}, []); 
  useEffect(() => {
    let mount = true
    getVenteCount().then(count => {
      if (mount) {
          console.log("Count from API:", count);
          setVente(count)
        
      }
    });
  
    return () => {
        mount = false;
    };
  }, []);
useEffect(() => {
  let mount = true
  getProduitCount().then(count => {
    if (mount) {
        console.log("Count from API:", count);
        setProduit(count)
      
    }
  });

  return () => {
      mount = false;
  };
}, []);
useEffect(() => {
  let mount = true
  getServiceCount().then(count => {
    if (mount) {
        console.log("Count from API:", count);
      setService(count)
      
    }
  });

  return () => {
      mount = false;
  };
}, []);
useEffect(() => {
  let mount = true
  getCommandeCount().then(count => {
    if (mount) {
        console.log("Count from API:", count);
        setCommande(count)
      
    }
  });

  return () => {
      mount = false;
  };
}, []);

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
        {
          name: 'Page H',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page I',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page J',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page K',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
      ];
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUITS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{produit}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CAMPAGNE</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>{campagne}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CLIENTS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{client}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Interaction</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>{service}</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home;
