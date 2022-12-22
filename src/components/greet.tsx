const Greet = () => {
    return (
        <>
            <h1>Job application form</h1>
            <h2>Section one</h2>

            <p>All fields are mandatory</p>

            <span title="close">Close</span>

            <img src="..." alt="some alt" />

            <div data-testid="custom-el">Custom HTML element</div>

            <form>
                <div>
                    <label htmlFor="l_name">
                        <input id="l_name" type="text" placeholder="Full name" value="Mourad" readOnly /> Name
                    </label>
                </div>

                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" id="bio" cols={30} rows={10}></textarea>
                </div>

                <div>
                    <label htmlFor="dropdown">Name</label>
                    <select name="" id="dropdown">
                        <option value=""></option>
                        <option value="AR">Arabic</option>
                        <option value="CA">Canada</option>
                        <option value="US">United States</option>
                        <option value="FR">French</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="terms">
                        <input type="checkbox" id="terms" /> I agree
                    </label>
                </div>

                <button>submit</button>
            </form>
        </>
    );
};

export default Greet;
