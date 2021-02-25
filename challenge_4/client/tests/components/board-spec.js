import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { configure, mount, shallow } from 'enzyme';
import App from '../../src/App.jsx';
import Board from '../../src/components/board.jsx';
import Square from '../../src/components/square.jsx';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe(`Win Annoucement`, () => {
  it('should announce a red win', async () => {
    const wrapper = mount(<App />);
    await wrapper.setState({
      winner: 'red'
    })
    expect(wrapper.find("#annouce-winner").text()).to.equal('Red Wins!');
  })

  it('should announce a yellow win', async () => {
    const wrapper = mount(<App />);
    await wrapper.setState({
      winner: 'yellow'
    })
    expect(wrapper.find("#annouce-winner").text()).to.equal('Yellow Wins!');
  })

  it('should announce a tie', async () => {
    const wrapper = mount(<App />);
    await wrapper.setState({
      winner: 'tie'
    })
    expect(wrapper.find("#annouce-winner").text()).to.equal("It's a Tie!");
  })
})

describe('Win Detection', () => {
  describe(`Vertical Win`, () => {
    it(`detects a vertical win`, async () => {
      const wrapper = mount(<App />);
      await wrapper.setState({
        t39: 'red',
        t32: 'red',
        t25: 'red',
      })
      await wrapper.find(`[id=4]`).simulate(`click`)
      expect(wrapper.state().winner).to.equal('red');
    });
  });

  describe(`Horizontal Win`, () => {
    it(`detects a horizontal win`, async () => {
      const wrapper = mount(<App />);
      await wrapper.setState({
        t36: 'red',
        t37: 'red',
        t38: 'red',
      })
      await wrapper.find(`[id=4]`).simulate('click');
      expect(wrapper.state().winner).to.equal('red');
    });

    it('should not detect a horizontal win on separate rows (3 + 1)', async () => {
      const wrapper = mount(<App />);
      await wrapper.setState({
        t33: 'red',
        t34: 'red',
        t35: 'red'
      })
      await wrapper.find(`[id=1]`).simulate(`click`);

      expect(wrapper.state().winner).to.equal(undefined);
    })

    it('should not detect a horizontal win on separate rows (2 + 2)', async () => {
      const wrapper = mount(<App />);
      await wrapper.setState({
        t34: 'red',
        t35: 'red',
        t36: 'red'
      });
      await wrapper.find(`[id=2]`).simulate(`click`);
      expect(wrapper.state().winner).to.equal(undefined);
    })

    it('should not detect a horizontal win on separate rows (1 + 3)', async () => {
      const wrapper = mount(<App />);
      wrapper.setState({
        t35: 'red',
        t36: 'red',
        t37: 'red',
      })
      await wrapper.find(`[id=3]`).simulate(`click`);

      expect(wrapper.state().winner).to.equal(undefined);
    })

  })
  describe(`Right Diagonal Win`, () => {
    it(`detects a right diagonal win`, async () => {
      const wrapper = mount(<App />);
      await wrapper.setState({
        t15: 'red',
        t23: 'red',
        t31: 'red'
      })
      await wrapper.find(`[id=4]`).simulate('click');
      // Winner
      expect(wrapper.state().winner).to.equal('red');
    });

    it('1+3, should not detect a right diagonal win if c1 < c2', async () => {
      const wrapper = mount(<App />);
      await wrapper.setState({
        t7: 'red',
        t15: 'red',
        t23: 'red',
        t38: 'yellow'
      })
      await wrapper.find(`[id=3]`).simulate('click');
      expect(wrapper.state().winner).to.equal(undefined);
    });

    it('2+2, should not detect a right diagonal win if c3 < c2', async () => {
      const wrapper = mount(<App />);
      wrapper.setState({
        t13: 'red',
        t21: 'red',
        t29: 'red'
      })
      await wrapper.find(`[id=2]`).simulate('click');
      expect(wrapper.state().winner).to.equal(undefined);
    });

    it('3+1, should not detect a right diagonal win if c4 < c3)', async () => {
      const wrapper = mount(<App />);
      await wrapper.setState({
        t12: 'red',
        t20: 'red',
        t28: 'red'
      })
      await wrapper.find(`[id=1]`).simulate('click');
      expect(wrapper.state().winner).to.equal(undefined);
    })


  });

  describe(`Left Diagonal Win`, () => {
    it(`Should detect a left diagonal win`, async () => {
      const wrapper = mount(<App />);
      wrapper.setState({
        t18: 'red',
        t24: 'red',
        t30: 'red'
      })
      await wrapper.find(`[id=1]`).simulate(`click`);
      // Winner
      expect(wrapper.state().winner).to.equal('red');
    })

    it('1+3, should not detect a left diagonal win if c4 > c3)', async () => {
      const wrapper = mount(<App />);
      await wrapper.setState({
        t3: 'red',
        t9: 'red',
        t15: 'red',
        t42: 'yellow',
        t35: 'red',
        t28: 'yellow'
      });
      await wrapper.find(`[id=7]`).simulate(`click`);
      expect(wrapper.state().winner).to.equal(undefined);
    })

    it('2+2, should not detect a left diagonal win if c3 > c2)', async () => {
      const wrapper = mount(<App />);
      await wrapper.setState({
        t16: 'red',
        t22: 'red',
        t28: 'red',
        t41: 'yellow'
      })
      await wrapper.find(`[id=6]`).simulate(`click`);
      expect(wrapper.state().winner).to.equal(undefined);
    })

    it('3+1, should not detect a left diagonal win if c2 > c1)', async () => {
      const wrapper = mount(<App />);
      wrapper.setState({
        t15: 'yellow',
        t21: 'yellow',
        t27: 'yellow',
        t40: 'red',
        turn: 'red'
      })
      await wrapper.find(`[id=5]`).simulate(`click`);
      expect(wrapper.state().winner).to.equal(undefined);
    })

  })

  describe(`Tie`, () => {
    it('should detect an obvious tie', async () => {
      const wrapper = mount(<App />);
      wrapper.setState({
        t1: 'yellow',
        t2: 'yellow',
        t3: 'yellow',
        // t4: 'red',
        t5: 'yellow',
        t6: 'yellow',
        t7: 'yellow',
        //
        t8: 'red',
        t9: 'red',
        t10: 'red',
        t11: 'yellow',
        t12: 'red',
        t13: 'red',
        t14: 'red',
        //
        t15: 'yellow',
        t16: 'yellow',
        t17: 'yellow',
        t18: 'red',
        t19: 'yellow',
        t20: 'yellow',
        t21: 'yellow',
        //
        t22: 'red',
        t23: 'red',
        t24: 'red',
        t25: 'yellow',
        t26: 'red',
        t27: 'red',
        t28: 'red',
        //
        t29: 'yellow',
        t30: 'yellow',
        t31: 'yellow',
        t32: 'red',
        t33: 'yellow',
        t34: 'yellow',
        t35: 'yellow',
        //
        t36: 'red',
        t37: 'red',
        t38: 'red',
        t39: 'yellow',
        t40: 'red',
        t41: 'red',
        t42: 'red'
      })
      await wrapper.find('[id=4]').simulate(`click`);
      expect(wrapper.state().winner).to.equal('tie');
    });
  })

});



