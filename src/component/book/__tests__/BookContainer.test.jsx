import React from 'react';
import renderWithRedux from '../../../util/testUtil';
import BookContainer from '../BookContainer';


describe('BookContainer',() => {
   it('should render with wihtout error',() => {
       const { getByText } = renderWithRedux(<BookContainer />, {
           initialState:{
               bookReducer:{
                   books:[{
                       id: 1,
                       title: 'test title',
                       description: 'desc',
                       releaseYear: 2019
                   }]
               }
           }
       })
       expect(getByText('Here we will display all books.')).toBeInTheDocument();
   }) 
});