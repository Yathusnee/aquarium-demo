import Paper from '@mui/material/Paper';
import './category.css';
import Typography from '@mui/material/Typography';
import CategoryModel from '../../../models/Category';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CATEGORIES, HOST } from '../../../config/globals';
import SubCategory from '../../../models/SubCategory';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Category(props: any) {

    const navigate = useNavigate();

    const category = props.category as CategoryModel;

    return (
        <div className="category-container">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h4" component="h2" mb={3}>
                    { CATEGORIES[category.name] }
                </Typography>
                <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {category.subcategories?.map((subcategory: SubCategory, index: number): any =>
                        <Grid item xs={2} sm={4} md={3} key={index}>
                            <CardActionArea onClick={() => setTimeout(() => navigate(`/products/${subcategory.name}`), 200)}>
                                <Card>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={`${HOST}/static/${subcategory.image}`}
                                        title={subcategory.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {subcategory.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {subcategory.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Grid>)}
                </Grid>
            </Paper>
        </div>
    )
}

export default Category;