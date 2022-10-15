
import React from 'react';
import { Loading } from './Loading';
import { Hits } from './Hits';
import { Catalog } from './Catalog';

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      error: ''
    };
  }

  loadItems() {
    fetch(`http://localhost:7070/api/${this.props.url}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: error
        });
      }
    )
  }

  componentDidMount() {
    this.loadItems()
  }
  

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <section className={this.props.type}>
              <h2 className="text-center">{ this.props.name }</h2>
              <Loading/>
            </section>;
    } else {
      return (
        <>
          <section className={this.props.type}>
            <h2 className="text-center">{ this.props.name }</h2>
            { this.props.url == 'top-sales' &&
              <Hits items={items} />
            }
            { this.props.url == 'items' &&
              <Catalog type={this.props.page}/>
            }
            
          </section>
        </>
        
      );
    }
  }

}

export default Section;

