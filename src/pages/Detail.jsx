import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonBackToHome } from '../components/ButtonBackToHome'

const API_KEY = 'a09c1814'

export class Detail extends Component {
    static propTypes = {
        match: PropTypes.shape({
          params: PropTypes.object,
          isExact: PropTypes.bool,
          path: PropTypes.string,
          url: PropTypes.string
        })
    }
    
    state = { movie: {} }

    _fetchMovie = ({ id }) => {
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
          .then(res => res.json())
          .then(movie => {
              this.setState({ movie })
          })
    }

    _goBack = () => {
        window.history.back()
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this._fetchMovie({ id })
    }

    render() {
      const { Title, Poster, Actors, Metascore, Plot } =  this.state.movie
      return(
        <div className="columns">
        <div className="column is-one-quarter"></div>
        <div className="columns">
        <div class="card is-three-quarters">
            <div class="card-image">
            <figure class="image is-3by2">
                <img src={Poster} alt={Title}/>
            </figure>
            </div>
            <div class="card-content">
            <div class="media">
                <div class="media-left">
                <figure class="image is-48x48">
                    <img src={Poster} alt={Title}/>
                </figure>
                </div>
                <div class="media-content">
                <p class="title is-4">{Actors}</p>
                </div>
            </div>
        
            <div class="content">
                {Metascore}
                <br/>
                {Plot}
            </div>
            <ButtonBackToHome/>
            </div>
        </div>
        </div>
        <div className="column is-one-quarter"></div>
        </div>
      )
    }
}