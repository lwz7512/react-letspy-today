import { Button } from 'primereact/button';

const ContactCard = ({handleRoute}) => (
  <div className="card m-2 md:m-3 p-5 xl:p-7 border-round surface-50">
    <div className="grid">
        <div className="section-content cell w-12 md:w-6">
            <h2 className="text-2xl xl:text-5xl">Let’s Work Together!</h2>
            <div className="text-block mt-5">
                <p className="text-xl x:text-2xl text-600">
                    Say hello at <a href="mailto:lwz7512@gmail.com">lwz7512@gmail.com </a>
                    or tell me more about your ideas by getting this better.
                </p>
            </div>
            <div className="button-group mt-5 flex justify-content-center md:justify-content-start">
                <Button label="Let’s start" onClick={handleRoute} />
            </div>
        </div>
        <div className="section-image cell mt-5 lg:mt-0 w-12 w-12 md:w-6">
            <img src="assets/layout/images/130.png" alt="cta" />
        </div>
    </div>
  </div>
)

export default ContactCard