import React, { Component } from 'react'


class OwnerList extends Component {
    componentDidMount() {
        console.log("componentDidMount -- OwnerList")
    }
    render() {
        console.log("render -- OwnerList")
        return (
            <section className="owners">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id}>
                        {owner.name}
                        <button  onClick={() => {
                                this.props.removeOwner(owner.id)
                            }}
                    >Remove Owner</button>

                    </div>
                )
            }
            </section>
        )
    }
}

export default OwnerList