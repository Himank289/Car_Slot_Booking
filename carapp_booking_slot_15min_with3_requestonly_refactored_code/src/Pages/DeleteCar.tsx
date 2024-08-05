import React ,{useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import carService from '../Services/CarService';
import './DeleteCar.css'
import Car from '../Types/Car';

const DeleteCar:React.FC= () => {

    const { id } = useParams<{ id: string }>();
    const navigate=useNavigate();
    const [car, setCar] = useState<Car|null>(null);

    useEffect(() => {
        carService.getCarById(id!).then(response => {
            setCar(response.data); 
        }).catch(err=>{
            console.error('Error fetching car:', err);
        });
    }, [id]);


    const handleDelete = () => {
        carService.deleteCar(id!).then(() => {
            navigate('/');
        });
    };

    if (!car) {
        return <div>Loading...</div>;
    }
  return (
    <div>
         <div className='delete-car-container'>
            <h1>Do You Really Wish to Delete the  Car</h1>
          
            <button className='delete-car-button'onClick={handleDelete}>Delete Car</button>
        </div>
      
    </div>
  )
}

export default DeleteCar
