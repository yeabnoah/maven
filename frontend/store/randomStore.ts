import { create } from 'zustand';


interface randomInterface {
    count : number,
    setCount : (count : number)=>void
    increaseCount : (count : number)=> void

}

const useRandomStuffStore = create<randomInterface>(()=>({
    count : 0,
    setCount : (count)=>{
        console.log(count)
    },
    increaseCount : (count)=>{
        console.log(count + 1)
    }
}))

export default useRandomStuffStore