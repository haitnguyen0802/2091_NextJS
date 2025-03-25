export default function Brand() {
    return (
        <>
            <div className="container">
                <div className="owl-carousel mt-5 mb-5 owl-simple" data-toggle="owl" data-owl-options="{
                                                  &quot;nav&quot;: false, 
                                                  &quot;dots&quot;: false,
                                                  &quot;margin&quot;: 30,
                                                  &quot;loop&quot;: false,
                                                  &quot;responsive&quot;: {
                                                      &quot;0&quot;: {
                                                          &quot;items&quot;:2
                                                      },
                                                      &quot;420&quot;: {
                                                          &quot;items&quot;:3
                                                      },
                                                      &quot;600&quot;: {
                                                          &quot;items&quot;:4
                                                      },
                                                      &quot;900&quot;: {
                                                          &quot;items&quot;:5
                                                      },
                                                      &quot;1024&quot;: {
                                                          &quot;items&quot;:6
                                                      }
                                                  }
                                              }">
                    <a href="#" className="brand">
                        <img src="assets/images/brands/1.png" alt="Brand Name" />
                    </a>
                    <a href="#" className="brand">
                        <img src="assets/images/brands/2.png" alt="Brand Name" />
                    </a>
                    <a href="#" className="brand">
                        <img src="assets/images/brands/3.png" alt="Brand Name" />
                    </a>
                    <a href="#" className="brand">
                        <img src="assets/images/brands/4.png" alt="Brand Name" />
                    </a>
                    <a href="#" className="brand">
                        <img src="assets/images/brands/5.png" alt="Brand Name" />
                    </a>
                    <a href="#" className="brand">
                        <img src="assets/images/brands/6.png" alt="Brand Name" />
                    </a>
                </div>
            </div>
            <div className="container">
                <hr className="mt-3 mb-6" />
            </div>

        </>
    );
}