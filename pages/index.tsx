import Head from 'next/head'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {selectAuthState, selectMsg, setIniMsg} from "../store/booksSlice";
import {useDispatch, useSelector} from "react-redux";
import PopUpCreateDialog from "@/pages/components/PopUpDialog/PopUpCreateDialog";
import Alert from '@mui/material/Alert';
import {useEffect, useState} from "react";
import BasicCard from "@/pages/components/MediaCard/MediaCard";
import PopUpEditDialog from "@/pages/components/PopUpDialog/PopUpEditDialog";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const booksState = useSelector(selectAuthState);
    const msg = useSelector(selectMsg);
    const dispatch = useDispatch
    const [alart,setAlart] = useState(false)
    useEffect(() => {
        return(()=>{
            // if (msg.msg !== ""){
                setAlart(true)
                const alartTimeout = setTimeout(()=>{
                    setAlart(false)
                }, 3000);
                // dispatch(setIniMsg())
            // }
            }
        )
    }, [msg]);


    return (
        <>
            <Head>
                <title>Book Store Demo</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <div className={styles.description}>
                    <p>
                        This is the Book Store Demo by Rui Yang based on NextJs and MUI Default Project&nbsp;
                        {/*<code className={styles.code}>pages/index.tsx</code>*/}
                    </p>
                    <PopUpCreateDialog />
                </div>

                <div>
                    <div className={"booksStoreContainer"}>
                        <div>
                            <div style={{display:"flex",flexWrap: "wrap",justifyContent:"center"}}>{booksState.map((ele)=>{
                                return(
                                    <div
                                        style={{margin:"20px"}} key={ele.id}>
                                        <PopUpEditDialog book={ele}/>
                                    </div>
                                )
                            })}</div>
                        </div>
                    </div>
                </div>{
                (alart && msg.msg !== "")&&
                <div style={{position:"fixed", right:"10px",top:"10px"}}>
                    <Alert severity={msg.severity === "success" ? "success" : msg.severity == "error" ? "error" : "info"}>{msg.msg}</Alert>
                </div>}
                {
                    (booksState.length === 0) &&
                    <div style={{marginTop:"150px"}}>
                        There is no book in the store, Add one now
                    </div>
                }

            </main>
        </>
    )
}
