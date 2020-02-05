import React from 'react';
import Calendar from './Calendar';

const App = () => {
  return  <div>
    <header>
      <div>
        <h4 style={{width:'100%', textAlign:'center'}}>My react calendar</h4>
      </div>
    </header>
    <main style={{width:'100%'}}>                    
      <Calendar/>
    </main>
  </div>;
};

export default App;