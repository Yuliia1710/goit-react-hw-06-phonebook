import { Formik } from 'formik';

import { FilterContainer, InputSearch } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <Formik>
      <FilterContainer>
        <InputSearch
          placeholder="Search Contact"
          onChange={e => dispatch(setFilter(e.currentTarget.value))}
        />
      </FilterContainer>
    </Formik>
  );
};

export default Filter;
