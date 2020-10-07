import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const Sink: React.FC<{}> = () => {
  return (
    <Layout>
      <SEO title="sink" />
      <div className="prose">
        <div>
          <h1>Typography</h1>
          <p>The base text is 1.6rem (16px) over 1.6 line height (24px)</p>
          <p>
            Donec volutpat massa eget lorem tincidunt semper. Nullam efficitur
            erat nec nisl malesuada venenatis. Nunc nec nunc malesuada felis
            semper mollis in sit amet nisl. Fusce vitae rutrum leo, sit amet
            consectetur lectus. In vel felis in tortor consequat sodales sit
            amet et sem. Curabitur ac laoreet odio.
          </p>
          <p>
            Quisque efficitur viverra lorem, ut aliquam lectus tristique at.
            Praesent id mi et neque ultrices cursus. Ut mattis venenatis
            iaculis. Nullam eget felis sit amet massa faucibus rhoncus.
            Vestibulum pharetra quam a leo sodales interdum.
          </p>
          <p>
            In molestie enim sem, sit amet dapibus lorem semper sed. Suspendisse
            fringilla aliquam tellus vitae facilisis. Phasellus molestie gravida
            erat, et euismod odio consequat vel.
          </p>
          <hr />
          <a href="#">Anchor</a>
          <em>Emphasis</em>
          <small>Small</small>
          <strong>Strong</strong>
          <u>Underline</u>
          <hr />
          <h1>Heading</h1>
          <h2>Heading</h2>
          <h3>Heading</h3>
          <h4>Heading</h4>
          <h5>Heading</h5>
          <h6>Heading</h6>
          <blockquote>
            <p>
              <em>This is a quote</em>
            </p>
          </blockquote>
          <pre>
            <code>
              {`.milligram {
  color: #9b4dca;
}`}
            </code>
          </pre>
        </div>
        <hr />
        <div>
          <h1>Form</h1>
          <form>
            <fieldset>
              <label htmlFor="nameField">Name</label>
              <input type="text" placeholder="Your name" id="nameField"></input>
              <label htmlFor="ageRangeField">Age Range</label>
              <select id="ageRangeField">
                <option value="0-13">0-13</option>
                <option value="14-17">14-17</option>
                <option value="18-23">18-23</option>
                <option value="24+">24+</option>
              </select>
              <label htmlFor="commentField">Comment</label>
              <textarea
                placeholder="placeholder test"
                id="commentField"
              ></textarea>
              <div className="float-right">
                <input type="checkbox" id="confirmField"></input>
                <label className="label-inline" htmlFor="confirmField">
                  Checkbox label
                </label>
              </div>
              <input
                className="button-primary"
                type="submit"
                value="Send"
              ></input>
            </fieldset>
          </form>
        </div>
        <hr />
        <div>
          <h1>Buttons</h1>
          <a className="button" href="#">
            Default Button
          </a>
          <button className="button button-outline">Outlined Button</button>
          <input
            className="button button-clear"
            type="submit"
            value="Clear Button"
          ></input>
        </div>
        <hr />
        <div>
          <h1>Lists</h1>
          <div className="row">
            <ul className="column">
              <li>Unordered list item 1</li>
              <li>Unordered list item 2</li>
            </ul>
            <ol className="column">
              <li>Ordered list item 1</li>
              <li>Ordered list item 2</li>
            </ol>
            <dl className="column">
              <dt>Description list item 1</dt>
              <dd>Description list item 1.1</dd>
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sink;
