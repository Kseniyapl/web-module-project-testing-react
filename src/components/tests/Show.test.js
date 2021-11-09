import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';


const testShow = {
    //add in approprate test data structure here.
    name: "test name",
    summary: "bla bla",
    seasons:[{
        id: 123,
        name: "Season 1",
        episodes:[]
    },
    {
        id: 234,
        name: "Season 2",
        episodes:[]
    },
    {
        id: 345,
        name: "Season 3",
        episodes:[]
    }
    ]
}
const testShow2 = {
    name: "test name 2",
    summary: "bla bla",
    season:[{
        id: 123,
        name: "Season 1",
        episodes:[]
    }]
}

test('renders testShow and no selected Season without errors', ()=>{
    render (<Show show={testShow} selectedSeason={'none'} />)
});

test('renders Loading component when prop show is null', () => {
    render (<Show show = {null} />)
    const loading = screen.queryByText('Fetching data...');
    expect(loading).toBeInTheDocument();

});

test('renders same number of options seasons are passed in', ()=>{
    render (<Show show={testShow} selectedSeason={'none'} />)
    const season = screen.queryAllByTestId("season-option");
    expect(season).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {

    const fakeGetData = jest.fn();
    render(<Show show = {testShow2} handleSelect={fakeGetData} />);
    const select = screen.queryByRole('select')
    userEvent.click(select)

    const option = screen.queryByTestId("season-option");
    userEvent.click(option);

    expect(fakeGetData).toHaveBeenCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={testShow} selectedSeason={'none'}/>);
    rerender(<Show show={testShow}selectedSeason={testShow.seasons[0]}/>)

});

//Tasks:
//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existance)
//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.