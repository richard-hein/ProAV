import { Carousel, CarouselItem, Image } from "react-bootstrap";

import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetTopProductQuery } from "../slices/productApiSlice"
import { Link } from "react-router-dom";

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductQuery();

  return  isLoading ? <Loader/> 
                : error ?
              <Message variant="danger">{error}</Message>
                    : (
                    <Carousel className="bg-primary mb-4"  pause='hover'>
                            {
                                products.map((product) => (
                                    <CarouselItem key={product._id}>
                                        <Link to={`/product/${product._id}`}>
                                            <Image src={product.image} alt={product.image} style={{ position: 'relative', height: '450px' }} />
                                                <Carousel.Caption className="carousel-caption">
                                                    <h3 className="text-white text-left">{product.name} (${product.price})</h3>
                                                </Carousel.Caption>
                                            
                                       </Link>
                                    </CarouselItem>
                                ))
                            }
                    </Carousel>
                    )
            }
  


export default ProductCarousel