import React, { useState } from 'react';
import MaterialTable from 'material-table';

import parseFoods from '../data/foods';
import tableIcons from '../tableIcons';
import RecipeCell from './RecipeCell';

const FoodTable = () => {
    const [valheimFood, setValheimFood] = useState(false);

    const columns = [
        {
            field: 'image',
            title: 'Img',
            maxWidth: 50,
            align: 'center',
            cellStyle: {padding: '5px'},
            headerStyle: {padding: '5px'},
            render: rowData => {
                return (
                    <div style={{ width: '32px' }}>
                        <img
                            src={`${rowData.image}`}
                            width="32px"
                        />
                    </div>
                );
            },
        },
        {
            field: 'name',
            title: 'Name',
            minWidth: 150,
            cellStyle: {padding: '5px'},
            headerStyle: {padding: '5px'},
        },
        {
            field: 'food',
            title: 'HP',
            maxWidth: 30,
            align: 'center',
            cellStyle: {padding: '5px'},
            headerStyle: {padding: '5px'},
        },
        {
            field: 'stamina',
            title: 'Stam',
            maxWidth: 40,
            align: 'center',
            cellStyle: {padding: '5px'},
            headerStyle: {padding: '5px'},
        },
        {
            field: 'burn',
            title: 'Burn',
            maxWidth: 40,
            align: 'center',
            cellStyle: {padding: '5px'},
            headerStyle: {padding: '5px'},
        },
        {
            field: 'prefab',
            title: 'Prefab ID',
            maxWidth: 140,
            align: 'left',
            cellStyle: {padding: '5px'},
            headerStyle: {padding: '5px'},
        },
        {
            field: 'recipe',
            title: 'Ingredients',
            align: 'right',
            cellStyle: {padding: '5px'},
            headerStyle: {padding: '5px', textAlign: 'center'},
            render: rowData => {
                return (
                    <RecipeCell
                        ingredients={rowData.recipe}
                    />
                );
            },
        }
    ];

    const handleValheimFood = () => {
        setValheimFood(!valheimFood);
    };

    const foodList = parseFoods(valheimFood);

    console.log(foodList);
    
    return (
        <div style={{maxWidth: '60%'}}>
            <label>
                <input type="checkbox" checked={valheimFood} onChange={handleValheimFood} />
                Show Valheim Foods
            </label>
            <MaterialTable
                title="Foods"
                icons={tableIcons}
                columns={columns}
                data={foodList}
                options={{
                    search: false,
                    draggable: false,
                    pageSize: -1,
                    emptyRowsWhenPaging: false,
                    showTitle: false,
                    rowStyle: {
                        padding: '0px',
                    }
                }}
            />
        </div>
    )
}

export default FoodTable;