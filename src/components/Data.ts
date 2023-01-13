import appExample1 from '../assets/projects/app_example1.png'
import appExample2 from '../assets/projects/app_example2.png'



export type DataType = {
    id:number
    name:string
    image: string
    github:string,
    live:string,
}

export const data: DataType[] = [
    {
        id:1,
        name:"React JS Application",
        image:appExample1,
        github:"",
        live:"",
    },
    {
        id:2,
        name:"React JS Application",
        image:appExample2,
        github:"",
        live:"",
    },
    // {
    //     id:3,
    //     name:"React JS Application",
    //     image:WorkIm,
    //     github:"",
    //     live:"",
    // },
    // {
    //     id:4,
    //     name:"React JS Application",
    //     image:RealEst,
    //     github:"",
    //     live:"",
    // },


]