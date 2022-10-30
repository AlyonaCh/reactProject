import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeSearch } from '../features/search/searchSlice'

export function Search(props) {
  const { show, setShow } = props;
  const search = useSelector((state) => state.search.title)
  const dispatch = useDispatch()

  const handlingBlur = (e) => {
    if (e.target.value) {
      dispatch(changeSearch(e.target.value))
    } else{
      setShow()
    }
  }

  return (
    <form data-id="search-form" className={"header-controls-search-form form-inline invisible" + (!show ? '' :'invisible')}>
      <input className="form-control" placeholder="Поиск" value={search.title} onBlur={handlingBlur}/>
    </form>
  );
}
