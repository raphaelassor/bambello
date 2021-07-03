import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { HomeHeader } from '../cmps/HomeHeader'
import heroImgUrl from '../assets/img/hero.png'
import productImgUrl from '../assets/img/bambello-homepage-product.png'
export class Home extends Component {
    render() {
        return (
            <div className="home">
                <HomeHeader />
                <main className="home-container">
                    <div className="hero-container">
                        <section className="hero">
                            <div className="hero-info">
                                <h1>Bambello helps teams move work forward.</h1>
                                <p>Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Bambello.</p>
                                <Link to="/board/60bb8a47bfc2a07e2ada4b0f" className="clean-link">Get started!</Link>
                            </div>
                            <div className="hero-img">
                                <img src={heroImgUrl} alt="" />
                            </div>
                        </section>
                    </div>
                    <section className="product">
                        <div className="product-info">
                            <h2>It's more than work. It's a way of working together.</h2>
                            <p>Start with a Bambello board, lists, and cards. Customize and expand with more features as your teamwork grows. Manage projects, organize tasks, and build team spirit—all in one place.</p>
                            <Link to="/signup" className="clean-link" >Start doing →</Link>
                        </div>
                        <div>
                            <img src={productImgUrl} alt="" />
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}