import styled from 'styled-components';

const AsideBox = styled.div`
  height: 200px;
  color: var(--font-color-title);
  border-radius: 2px;
  border: 1px solid #F0E6C5;
  box-shadow: 0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);

  .title {    
    padding: 10px;
    background-color: #FAF3D8;
  }

  ul {
    padding: 5px 10px 5px 10px;
    background-color: #FCF7E4;
  }
`;

function Aside() {
  return (
    <aside>
      <AsideBox>
        <div className="title">Custom Filters</div>
        <ul>
          <li>Use Git tactically</li>
          <li>Let’s talk about our favorite terminal tools</li>
        </ul>
      </AsideBox>
    </aside>
  );
}

export default Aside;