import React, { useState } from 'react'
import './App.css';
import Header from './components/Header'
import Select from './components/Select'
import Input from './components/Input'
import CardPage from './components/CardPage'
import Loader from 'react-loader-spinner'

function App() {
  const [commonplaceData, setCommonplaceData] = useState('');
  const [dropdownValues, setDropdownValues] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState('false');
  const [searchTerm, setSearchTerm] = useState('');
  const [commonplaceURL, setCommonplaceURL] = useState('');

  const getDropdowns = data => {
    const filterList = [];

    const sortNumerically = (a, b) => {
      a = a.replace(/[^\d.-]/g, '');
      b = b.replace(/[^\d.-]/g, '');
      return a - b;
    }

    data.forEach(comment => {
      let nameIndex;
      comment.fields.forEach((el,i) => {
        if (el.name === "lookingAtThePointsOnTheMapShownAboveWhichPointAreYouCommentingOnPleaseAddSeparateCommentsForDifferentPoints") {
          nameIndex = i;
        }
      })
      const filterName = comment.fields[nameIndex];
      if (filterName !== undefined) {
        if (filterList.indexOf(filterName.value) === -1) {
          filterList.push(filterName.value);
        }
      }
    });
    filterList.sort(sortNumerically);
    setDropdownValues(filterList);
  }
  const doUpdateURL = url => {
    setCommonplaceURL(url);
    setLoading(true);
    const urls = url.split('commonplace.is');
    urls.splice(1, 0, 'commonplace.is/schemes');
    urls.push('/comments.json?from=0&pageSize=10000');
    url = urls.join('');
    const proxyurl = "https://evening-sands-83052.herokuapp.com/";
    console.log(proxyurl + url)
    fetch(proxyurl + url)
      .then(response => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        setCommonplaceData(jsonData.data);
        getDropdowns(jsonData.data);
        setLoading(false);
      })
      .catch((error) => {
        // handle your errors here
        console.error(error);
      });
  }

  const doUpdateSearch = inputSearch => {
    setSearchTerm(inputSearch)
  }
  const doUpdateDropdown = e => {
    setSelectedFilter(e.target.value);
  }
  return (
    <>
      <Header doUpdate={doUpdateURL} commonplaceURL={commonplaceURL} />
      <Select selectList={dropdownValues} doUpdateDropdown={doUpdateDropdown} />
      <Input doUpdate={doUpdateSearch} value={searchTerm} placeholder="Search.." />
      <CardPage commonplaceData={commonplaceData} selectedFilter={selectedFilter} searchTerm={searchTerm} />
      <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         visible={loading}
      />
    </>
  );
}

export default App;
