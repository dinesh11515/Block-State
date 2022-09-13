import { MdLocationOn } from 'react-icons/md';

export default function NftDetails(props){
    return (
        <div className="text-white">
            {/* <div className="rounded-sm aspect-w-16 aspect-h-9">
                <iframe src="https://www.youtube.com/embed/7Qivx2om0MM" width="100%" height="315" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture"></iframe>
            </div> */}
            <div className='flex px-60 pt-20 pb-20'>
                <img className="h-128 w-128 rounded-md" src="/realstate.jpeg"></img>
                <div className='pl-10 w-128'>
                    <div className="text-2xl text-bold">
                        {props.name}
                    </div>
                    <div>
                        {props.description}
                    </div>
                    {props.details}
                    <div className='flex items-center gap-2'>
                        <MdLocationOn /> {props.location}
                    </div>
                    <div className='flex gap-5'>
                        <button className='p-2 bg-blue-500 hover:bg-blue-700 hover:text-white hover:shadow-lg rounded-md'>Buy</button>
                        <button className='p-2 bg-blue-500 hover:bg-blue-700 hover:text-white hover:shadow-lg rounded-md'>Rent</button>
                    </div>
                </div>
            </div>
        </div>
    )
}