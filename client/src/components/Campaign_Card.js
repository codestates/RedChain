

function Campaign_Card({item}) {
    return (
        <li className="campaign-items-side "
              style={{backgroundImage:`url(/campaignImg/${item.id}.jpeg)`}}>사이드

                  <div className="campaign-item-info">  
                      <h1>{item.title}</h1>
                      <p>{item.group}</p>
                      <p>D-Day: {item.dday}</p>
                      <progress value="3" max="100"></progress>
                      <p>{item.amount}</p>
                  </div>
              </li>
    )
}

export default Campaign_Card