import { useEffect, useState } from 'react';
import { CATEGORIES, HOST } from '../../config/globals';
import './calculator.css';
import Product from '../../models/Product';
import { ProductService } from '../../services/product_service';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { CompatibilityService } from '../../services/compatibility_service';
import Compatibility from '../../models/Compatibility';

class FishItem {
    id: string = '';
    x: number = 0;
    y: number = 0;
    width: number = 1;
    height: number = 1;
    image: string = '';
    name: string = '';

    constructor(id: string, name: string, image: string, x: number, y: number, width: number, height: number) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

function CompatibilityCalculator() {

    const [products, setProducts] = useState<Product[]>([]);
    const [fishes, setFishes] = useState<FishItem[]>([]);
    const [compatibilites, setCompatibilites] = useState<Compatibility[]>([]);
    const [open, setOpen] = useState(false);

    const viewCompatibility = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        ProductService.getProductsForCompatibility().then(res => {
            if (res.status === 200) {
                setProducts(res.data);
            }
        }).catch(err => {
            console.log(err);
        });

        CompatibilityService.getAllCompatibilities().then(res => {
            if (res.status === 200) {
                setCompatibilites(res.data);
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const addFish = (item: Product) => {
        const x = 10 + Math.random() * (460 - 10);
        const y = 50 + Math.random() * (240 - 50);
        setFishes((prev) => [...prev, new FishItem(item._id!, item.name!, item.icon!, x, y, item.iconWidth, item.iconHeight)]);
    }

    const clearTank = () => {
        setFishes([]);
    }

    const getCompatibilityIcon = (fish1: FishItem, fish2: FishItem) => {
        for (let i in compatibilites) {
            if ((compatibilites[i].product1Id === fish1.id && compatibilites[i].product2Id === fish2.id) || (compatibilites[i].product1Id === fish2.id && compatibilites[i].product2Id === fish1.id)) {
                if (compatibilites[i].compatibility === 'compatible') {
                    return (<img className="compatibility-icon" alt="Compatible" src={`${HOST}/static/compatible.jpg`} />);
                } else if (compatibilites[i].compatibility === 'not') {
                    return (<img className="compatibility-icon" alt="Not Compatible" src={`${HOST}/static/not-compatible.jpg`} />);
                } else {
                    return (<img className="compatibility-icon" alt="Not Compatible" src={`${HOST}/static/sometimes-compatible.jpg`} />);
                }
            }
        }
        return (<img className="compatibility-icon" alt="No Data" src={`${HOST}/static/no-data.jpg`} />);
    }

    return (
        <>
            <div className="body-container compatibility-calculator">
                <div className="fish-tank-container">

                    <div className='tank-image-holder'>
                        <img src={`${HOST}/static/tank.jpg`} alt="Fish Tank" />
                        <div className='tank-fish-container'>
                            {
                                fishes.map((item, index) => <img key={index} src={`${HOST}/static/${item.image}`} alt='test' style={{ position: 'absolute', left: item.x, top: item.y, maxWidth: item.width, minWidth: item.width, maxHeight: item.height, minHeight: item.height }} />)
                            }
                        </div>
                    </div>
                    <div className='tank-btn-container'>
                        <Button onClick={viewCompatibility} variant="contained">View Compatibility</Button>
                        <Button onClick={clearTank} color='warning' variant="outlined">Clear Tank</Button>
                    </div>

                </div>
                <div className="fish-list-container">
                    <div className='fish-list'>

                        {
                            products.map((item, index) =>
                                <div onClick={() => addFish(item)} className='fish-item' key={index}>
                                    <img src={`${HOST}/static/${item.images![0]}`} alt={item.name} />
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p> {CATEGORIES[item.category!]} </p>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Fish Compatibility Matrix
                </DialogTitle>
                <DialogContent>
                    
                        <table className='compatibility-table'>
                            <tbody>
                                <tr>
                                    <td></td>
                                    {
                                        fishes.map((item, index) =>
                                            <td key={index}> {item.name} </td>
                                        )
                                    }
                                </tr>
                                {
                                    fishes.map((item, index) =>
                                        <tr key={index}>
                                            <td> {item.name} </td>
                                            {
                                                fishes.map((item1, index1) => <td key={index1}> {
                                                    getCompatibilityIcon(item, item1)
                                                } </td>)
                                            }
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Okay
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CompatibilityCalculator;