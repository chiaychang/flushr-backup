import React from 'react'
import { withRouter } from 'react-router'
import { graphql, gql } from 'react-apollo'
import { Container, Header, Form, Button } from 'semantic-ui-react'
import Logo from './Logo'
import GettingStartedGoogleMaps from './GettingStartedGoogleMap'

class CreateReview extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
    data: React.PropTypes.object,
  }

  state = {
    description: '',
    imageUrl: '',
    rating: '',

  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if no user is logged in
    if (!this.props.data.user) {
      console.warn('only logged in users can create new posts')
      this.props.router.replace('/')
    }

    return (
      <Container>
        <Logo />
        <div className='panel panel-default add-review-panel'>
          <div className='panel-heading'>Add New Review</div>
          <div className='panel-body'>
            <Form>
              <Form.Field>
                <label>Bathroom Description</label>
                <input
                  value={this.state.description}
                  placeholder='Description'
                  onChange={(e) => this.setState({description: e.target.value})}
                />
              </Form.Field>
              <Form.Field>
                <label>Bathroom Rating</label>
                <input
                  value={this.state.rating}
                  placeholder='Rating'
                  onChange={(e) => this.setState({rating: e.target.value})}
                />
              </Form.Field>
              <Form.Field>
              <label>Bathroom Image</label>
                <input
                  value={this.state.imageUrl}
                  placeholder='Image Url'
                  onChange={(e) => this.setState({imageUrl: e.target.value})}
                />
              </Form.Field>
              {this.state.imageUrl &&
                <img src={this.state.imageUrl} role='presentation' className='image-upload' />
              }
              {this.state.description && this.state.imageUrl &&
                <Button type='submit' className='large ui button teal' onClick={this.handlePost}>Post</Button>
              }
            </Form>
            </div>
          </div>

      </Container>
    )
  }

  handlePost = () => {
    const {description, imageUrl, rating} = this.state
    this.props.mutate({variables: {description, imageUrl, rating}})
      .then(() => {
        this.props.router.replace('/')
      })
  }
}

const createReview = gql`
  mutation ($description: String!, $imageUrl: String!, $rating: String!) {
    createPost(description: $description, imageUrl: $imageUrl, rating: $rating) {
      id
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(createReview)(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }} )(withRouter(CreateReview))
)
