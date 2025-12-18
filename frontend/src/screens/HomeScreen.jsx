// dependecies
import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
// components
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import Product from '../components/Product';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const {pageNumber, keyword} = useParams();
  const { data, isLoading, error } = useGetProductsQuery({keyword, pageNumber});

   
   
  return (
    <>
      
      {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>}
      {
        isLoading ? (
         <Loader/>
        ) : error ? (
            <Message variant='danger'>
               {error?.data?.message || error.error}
            </Message>
          ) : (
             
              <>
                 <Meta/>
                <h1>Latest Products</h1>
          <Row>
              {
                    data.products.length === 0 && 
                   <h5 className='bg-success text-white py-4 text-center mt-5'>There is no related products.</h5>
                    
              }
              {data.products && data.products.map((product) => (
              <Col key={product._id}  md={6} lg={6} xl={4}>
                <Product product={product} />
              </Col>
            ))}
          
              
                </Row>
                <div className="float-end">
                  <Paginate  pages={data.pages} page={data.page} keyword={keyword? keyword : ''}/>
                </div>
                </>
        )
       }
          
      </>
  )
}

export default HomeScreen