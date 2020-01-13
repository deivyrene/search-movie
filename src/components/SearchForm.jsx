import React, { Component } from 'react'

const API_KEY = 'a09c1814'

export class SearchForm extends Component {
    state = {
        inputMovie : ''
    }

    _handleChange = (e) => {
        this.setState({ inputMovie: e.target.value })
    }

    _handleSubmit = (e) => {
        e.preventDefault()
        const { inputMovie } = this.state

        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${inputMovie}`)
          .then(res => res.json())
          .then(results => {
              const { Search = [] } = results
              this.props.onResults(Search)
          })
    }

    render() {
      return(
        <form onSubmit={this._handleSubmit}>
            <div className="field has-addons">
                <div className="control">
                    <input 
                        required
                        className="input" 
                        onChange={this._handleChange}
                        type="text" 
                        placeholder="Pelicula a buscar.." />
                </div>
                <div className="control">
                    <button className="button is-info">
                    Buscar
                    </button>
                </div>
            </div>
        </form>
      )
    }
}